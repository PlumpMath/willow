
# Willow is a light-weight markup language.#

中文名字称为柳线

Syntax: **#bold#**, `inline code`, <http://link.demo>
  code blocks

`wl2html` compiles a `.wl` file to `.html`
  wl2html a.wl
  wl2html a.willow
  wl2html a.willow path/
  wl2html a.wl path/file.html
  wl2md a.wl
  wl2md a.willow
  wl2md a.wl path/
  wl2md a.wl path/a.md

`wl2md` id only a wrapper of `narkcown` which converts `.nc` to `.md`.
https://gist.github.com/2626097
`wl2html` is a command which turns `.wl` file into a page.
https://github.com/github/markup/pull/156
Also, `willow.js` can be used in browser, with you own `.css`.
