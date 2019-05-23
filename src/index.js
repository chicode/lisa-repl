import { Elm } from "./Main.elm";
import * as lisavm from "lisa-vm";
import * as repl from "repl";

const app = Elm.Main.init();

function processLisa(s) {
  let out;
  function sub(res) {
    out = res;
    app.ports.out.unsubscribe(sub);
  }
  app.ports.out.subscribe(sub);
  app.ports.incoming.send(s);
  return out;
}

const programScope = lisavm.initProgram();
repl.start({
  eval: (evalCmd, _context, _file, cb) => {
    setImmediate(() => {
      const programResult = processLisa(evalCmd);
      if (programResult.status === "err") {
        const err = new SyntaxError(programResult.error.msg);
        return cb(
          programResult.error.recoverable ? new repl.Recoverable(err) : err
        );
      }
      const program = programResult.result;
      try {
        lisavm.evalProgramInScope(program, programScope);
      } catch (err) {
        cb(err);
      }
      const result = programScope.getVar("result");
      cb(null, result && lisavm.valueToJs(result.value));
    });
  }
});
