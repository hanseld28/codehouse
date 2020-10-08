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
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/static/css/bootstrap.min.css\"><link rel=\"stylesheet\" href=\"/static/css/fontawesome.min.css\"><link rel=\"stylesheet\" href=\"/static/css/codehouse.css\"></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"mainHeader\"><div class=\"container\"><div class=\"row align-items-center\"><div class=\"col-4\"><h1 class=\"logo\"><img src=\"/static/images/logo-codehouse.svg\" alt=\"Casa do Código\"></h1></div><div class=\"mainHeader-navigation col-8\"><a href=\"#\" class=\"login\"><i class=\"fas fa-sign-in-alt\"></i>Login</a></div></div></div></header><main class=\"mainContent\"><div class=\"container\"><h1>Cadastro de livros</h1><form action=\"/books\" method=\"post\">");

  if (data.validationErrors) {
    out.w("<div>");

    var for__21 = 0;

    marko_forEach(data.validationErrors, function(error) {
      var keyscope__22 = "[" + ((for__21++) + "]");

      out.w("<div class=\"alert alert-danger\">" +
        marko_escapeXml(error.msg) +
        "</div>");
    });

    out.w("</div>");
  }

  if (data.book.id) {
    out.w("<div><input type=\"hidden\" name=\"_method\" value=\"PUT\"><input type=\"hidden\" id=\"id\" name=\"id\"" +
      marko_attr("value", `${data.book.id}`) +
      "></div>");
  }

  out.w("<div class=\"form-group\"><label for=\"title\">Titulo:</label><input class=\"form-control\" type=\"text\" id=\"title\" name=\"title\" placeholder=\"Digite o titulo do livro\"" +
    marko_attr("value", `${data.book.title}`) +
    "></div><div class=\"form-group\"><label for=\"price\">Preço:</label><input class=\"form-control\" type=\"number\" id=\"price\" name=\"price\" placeholder=\"150.25\"" +
    marko_attr("value", `${data.book.price}`) +
    "></div><div class=\"form-group\"><label for=\"description\">Descrição:</label><textarea class=\"form-control\" cols=\"20\" rows=\"10\" id=\"description\" name=\"description\" placeholder=\"Digite uma breve descrição sobre o livro\">" +
    marko_escapeXml(data.book.description) +
    "</textarea></div><input type=\"submit\" class=\"btn btn-primary\" value=\"Salvar\"></form></div></main><footer class=\"footer\"><div class=\"container\"><div class=\"row align-items-center\"><div class=\"col-4\"><img src=\"/static/images/logo-footer.svg\" class=\"logo-footer\"></div><div class=\"col-8\"><ul class=\"socialNetworks\"><li><a href=\"http://www.facebook.com/casadocodigo\" class=\"share-facebook\" target=\"_blank\">/CasaDoCodigo</a></li><li><a href=\"http://www.twitter.com/casadocodigo\" class=\"share-twitter\" target=\"_blank\">@casadocodigo</a></li></ul></div></div></div></footer>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "48");

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
