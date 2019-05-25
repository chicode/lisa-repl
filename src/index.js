import { Elm } from "./Main.elm";
import * as lisavm from "lisa-vm";
import * as repl from "repl";

const app = Elm.Main.init();

const programScope = lisavm.initProgram();
programScope.vars["-last"] = {
  type: "const",
  get value() {
    return rep.last || { type: "none" };
  }
};
const rep = repl.start({
  ignoreUndefined: true,
  eval: (evalCmd, _context, _file, cb) => {
    app.ports.out.subscribe(sub);
    app.ports.incoming.send(evalCmd);
    function sub(programResult) {
      app.ports.out.unsubscribe(sub);

      if (programResult.status === "err") {
        const err = new SyntaxError(programResult.error.msg);
        return cb(
          programResult.error.recoverable ? new repl.Recoverable(err) : err
        );
      }
      const program = programResult.result;
      try {
        const result = lisavm.evalExpressions(programScope, program);
        rep.last = result;
        cb(null, result.type !== "none" ? lisavm.valueToJs(result) : undefined);
      } catch (err) {
        cb(err);
      }
    }
  }
});
