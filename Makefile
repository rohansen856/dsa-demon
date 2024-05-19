default: run
test:
	echo hello && echo hi
begin:
	npm i && npm run build && npm run start
run:
	npm run dev
deploy:
	git add . && git commit -m "commited" && git push origin master
container:
	docker build -t dsa-demon . && docker run -p 3000:3000 dsa-demon npm run dev
