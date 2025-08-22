% Importation des modules nécessaires
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).


% Types de crime
crime_type(assassinat).
crime_type(vol).
crime_type(escroquerie).


% Faits
suspect(john).
suspect(mary).
suspect(alice).
suspect(bruno).
suspect(sophie).

has_motive(john, vol).
has_motive(mary, assassinat).
has_motive(alice, escroquerie).

was_near_crime_scene(john, vol).
was_near_crime_scene(mary, assassinat).

has_fingerprint_on_weapon(john, vol).
has_fingerprint_on_weapon(mary, assassinat).

has_bank_transaction(alice, escroquerie).
has_bank_transaction(bruno, escroquerie).

owns_fake_identity(sophie, escroquerie).


% Règles
is_guilty(Suspect, vol) :-
    has_motive(Suspect, vol),
    was_near_crime_scene(Suspect, vol),
    has_fingerprint_on_weapon(Suspect, vol).

is_guilty(Suspect, assassinat) :-
    has_motive(Suspect, assassinat),
    was_near_crime_scene(Suspect, assassinat),
    ( has_fingerprint_on_weapon(Suspect, assassinat)
    ; eyewitness_identification(Suspect, assassinat)
    ).

is_guilty(Suspect, escroquerie) :-
    has_motive(Suspect, escroquerie),
    has_bank_transaction(Suspect, escroquerie),
    owns_fake_identity(Suspect, escroquerie).


% Activer CORS globalement
:- set_setting(http:cors, [*]).

% Déclaration de la route de jugement
:- http_handler(root(juger), judge, []).

% Route(middleware) : /juger
judge(Request) :-
    cors_enable(Request, [methods([get,post,options])]),  % Autoriser GET, POST, OPTIONS
    http_read_json_dict(Request, DictIn),
    
    is_guilty(DictIn.nom, DictIn.crime) ->
        reply_json_dict(_{result : "guilty"});
        reply_json_dict(_{result : "not_guilty"}).


% Lancer le serveur sur le port 8080
server(Port) :-
    http_server(http_dispatch, [port(Port)]).