// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/codehouse$1.0.0/src/app/views/books/form/form.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_attr = marko_helpers.a,
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><body>");

  component_globals_tag({}, out);

  out.w("<h1>Cadastro de livros</h1><form action=\"/books\" method=\"post\">");

  if (data.book.id) {
    out.w("<div><input type=\"hidden\" name=\"_method\" value=\"PUT\"><input type=\"hidden\" id=\"id\" name=\"id\"" +
      marko_attr("value", `${data.book.id}`) +
      "></div>");
  }

  out.w("<div><label for=\"title\">Titulo:</label><input type=\"text\" id=\"title\" name=\"title\" placeholder=\"Digite o titulo do livro\"" +
    marko_attr("value", `${data.book.title}`) +
    "></div><div><label for=\"price\">Preço:</label><input type=\"number\" id=\"price\" name=\"price\" placeholder=\"150.25\"" +
    marko_attr("value", `${data.book.price}`) +
    "></div><div><label for=\"description\">Descrição:</label><textarea cols=\"20\" rows=\"10\" id=\"description\" name=\"description\" placeholder=\"Digite uma breve descrição sobre o livro\">" +
    marko_escapeXml(data.book.description) +
    "</textarea></div><input type=\"submit\" value=\"Salvar\"></form>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "17");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/codehouse$1.0.0/src/app/views/books/form/form.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
