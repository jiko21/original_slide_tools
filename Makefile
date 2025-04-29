TARGET_DIR=/home/daiki/ghq/github.com/jiko21/slide_tools/slides

dev:
	TARGET_DIR=$(TARGET_DIR) pnpm run dev
	
build:
	TARGET_DIR=$(TARGET_DIR) pnpm run build

serve:
	TARGET_DIR=$(TARGET_DIR) pnpm run start
print: build
	pnpm run print