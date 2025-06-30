.PHONY: build

build: main.pdf
	open ./main.pdf

main.pdf: main.typ auth.typ
	typst compile main.typ main.pdf


