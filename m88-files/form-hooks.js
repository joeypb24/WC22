"use strict";require(["jquery","jquery.validate"],(function(a){var i="form-valid";function t(t){var s=a(this).validate();if(s){var o=s.checkForm(),n=this.classList.contains(i);o&&!n?this.classList.add(i):!o&&n&&this.classList.remove(i)}}a("form:not(.validation-bound)").each(t),a("form:not(.validation-bound)").addClass("validation-bound").on("change",t)}));