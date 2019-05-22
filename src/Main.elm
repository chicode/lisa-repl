port module Main exposing (main)

import Dict
import Json.Encode as E
import Lisa


type Msg
    = Request String


update : Msg -> () -> ( (), Cmd Msg )
update msg () =
    case msg of
        Request s ->
            ( ()
            , out <|
                case Lisa.processStringToJson s { macros = Dict.empty } of
                    Ok parsed ->
                        E.object
                            [ ( "status", E.string "ok" )
                            , ( "result", parsed )
                            ]

                    Err err ->
                        E.object
                            [ ( "status", E.string "err" )
                            , ( "error", err )
                            ]
            )


main : Program E.Value () Msg
main =
    Platform.worker
        { init = \_ -> ( (), Cmd.none )
        , update = update
        , subscriptions = \_ -> incoming Request
        }


port incoming : (String -> msg) -> Sub msg


port out : E.Value -> Cmd msg
