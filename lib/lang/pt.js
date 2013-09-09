function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "durante a noite" ? period.slice(4) :
         period.slice(0, 7) ===   "in the " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "céu limpo",
  "no-precipitation": "sem precipitação",
  "mixed-precipitation": "precipitação mista",
  "possible-very-light-precipitation": "possível precipitação fraca",
  "very-light-precipitation": "precipitação fraca",
  "possible-light-precipitation": "possível precipitação fraca",
  "light-precipitation": "precipitação fraca",
  "medium-precipitation": "precipitação",
  "heavy-precipitation": "precipitação forte",
  "possible-very-light-rain": "possível chuvisco",
  "very-light-rain": "chuvisco",
  "possible-light-rain": "possível chuva fraca",
  "light-rain": "chuva fraca",
  "medium-rain": "chuva",
  "heavy-rain": "chuva forte",
  "possible-very-light-sleet": "possível granizo fraco",
  "very-light-sleet": "granizo fraco",
  "possible-light-sleet": "possível granizo fraco",
  "light-sleet": "granizo fraco",
  "medium-sleet": "granizo",
  "heavy-sleet": "granizo forte",
  "possible-very-light-snow": "possíveis flocos de neve",
  "very-light-snow": "flocos de neve",
  "possible-light-snow": "possível neve fraca",
  "light-snow": "neve fraca",
  "medium-snow": "neve",
  "heavy-snow": "nevão",
  "light-wind": "ventos fracos",
  "medium-wind": "ventos médios",
  "heavy-wind": "ventos fortes",
  "low-humidity": "pouco húmido",
  "high-humidity": "húmido",
  "fog": "nevoeiro",
  "light-clouds": "parcialmente nublado",
  "medium-clouds": "nublado",
  "heavy-clouds": "coberto",
  "today-morning": "esta manhã",
  "later-today-morning": "o final da manhã",
  "today-afternoon": "esta tarde",
  "later-today-afternoon": "o final da tarde",
  "today-evening": "o final do dia",
  "later-today-evening": "o final do dia",
  "today-night": "a noite",
  "later-today-night": "o final da noite",
  "tomorrow-morning": "amanhã de manhã",
  "tomorrow-afternoon": "amanhã à tarde",
  "tomorrow-evening": "amanhã ao final do dia",
  "tomorrow-night": "amanhã à noite",
  "morning": "de manhã",
  "afternoon": "a tarde",
  "evening": "ao final do dia",
  "night": "a noite",
  "today": "o dia",
  "tomorrow": "amanhã",
  "sunday": "Domingo",
  "monday": "Segunda-Feira",
  "tuesday": "Terça-Feira",
  "wednesday": "Quarta-Feira",
  "thursday": "Quinta-Feira",
  "friday": "Sexta-Feira",
  "saturday": "Sábado",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "menos de $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", e " : " e "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " até ");
  },
  "with": "$1, com $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 durante a próxima hora",
  "starting-in": "$1 começando dentro de $2",
  "stopping-in": "$1 acabando dentro de $2",
  "starting-then-stopping-later": "$1 começando dentro de $2, e acabando $3 depois",
  "stopping-then-starting-later": "$1 acabando dentro de $2, e reiniciando $3 depois",
  "for-day": "$1 durante o dia",
  "starting": "$1 começando $2",
  "until": function(condition, period) {
    return condition + " até " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " até " + strip_prefix(a) + ", reiniciando " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " começando " + a + ", continuando até " +
           strip_prefix(b);
  },
  "during": "$1 durante $2",
  "for-week": "$1 durante a semana",
  "over-weekend": "$1 durante o fim-de-semana",
  "temperatures-peaking": "temperaturas máximas de $1 $2",
  "temperatures-rising": "temperaturas subindo até $1 $2",
  "temperatures-valleying": "temperaturas mínimas de $1 $2",
  "temperatures-falling": "uma baixa na temperatura para $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.replace(
      /\b(?:a(?!nd\b)|[^\We])/g,
      function(letter) {
        return letter.toUpperCase();
      }
    );
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  }
});
