import { task, src, dest } from "gulp";
import autoprefixer from "gulp-autoprefixer";

task("default", "styles", function() {
  src("css/styles.css")
  .pipe(autoprefixer())
  .pipe(dest("build"))
});