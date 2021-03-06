from aiohttp import web, ClientSession
import aiohttp_jinja2
import jinja2
import json

from req import post_request, consumer_key


redirect_uri = "http://localhost:8080/redirect"


def get_auth_data():
	return json.load(open("auth.json"))

def set_auth_data(auth):
	json.dump(auth, open("auth.json", "w"), indent=4)


async def auth_request():
	return await post_request('https://getpocket.com/v3/oauth/request', {
		"consumer_key": consumer_key,
		"redirect_uri": redirect_uri,
	})

async def auth_authorize(code):
	return await post_request('https://getpocket.com/v3/oauth/authorize', {
		"consumer_key": consumer_key,
		"code": code,
	})


async def handle_index(request):
	return web.FileResponse("./static/index.html")


async def handle_auth(request):
	name = request.match_info.get('name', "Anonymous")
	auth = await auth_request()
	redirect_uri = f"http://localhost:8080/redirect/{auth['code']}"
	redirect_url = f"https://getpocket.com/auth/authorize?request_token={auth['code']}&redirect_uri={redirect_uri}"
	return web.HTTPFound(location=redirect_url)


@aiohttp_jinja2.template("redirect.jinja2")
async def handle_redirect(request):
	code = request.match_info.get("code")
	auth = await auth_authorize(code)
	if auth is None:
		return web.HTTPFound(location="/auth")
	auth_string = json.dumps(auth)
	return {
		"auth_string": auth_string
	}


app = web.Application()
aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader('./templates'))
app.add_routes([
	web.get('/', handle_index),
	web.static('/static', './static'),
	
	web.get('/auth', handle_auth),
	web.get('/redirect/{code}', handle_redirect),
])

if __name__ == '__main__':
	web.run_app(app)

