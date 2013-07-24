module.exports = function(template) {
  function parse(expr) {
    if(typeof expr === "number")
      return expr.toString();

    else if(typeof expr === "string") {
      if(!template.hasOwnProperty(expr))
        throw new Error("\"" + expr + "\" not found in language template.");

      else
        return template[expr];
    }

    else if(Array.isArray(expr)) {
      if(!template.hasOwnProperty(expr[0]))
        throw new Error("\"" + expr[0] + "\" not found in language template.");

      else if(typeof template[expr[0]] === "string")
        return template[expr[0]].replace(/\$\d+/g, function(n) {
          return parse(expr[n.slice(1)|0]);
        });

      else if(typeof template[expr[0]] === "function")
        return template[expr[0]].apply(null, expr.slice(1).map(function(arg) {
          return parse(arg);
        }));

      else
        throw new Error("\"" + expr[0] + "\" is not a valid language template pattern.");
    }

    else
      throw new Error("Invalid expression.");
  }

  return parse;
};