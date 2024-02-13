import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function (date, formatStr = "PP") {
  return format(date, formatStr, {
    locale: es // or global.__localeId__
  });
}