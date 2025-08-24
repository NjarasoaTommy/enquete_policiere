:- encoding(utf8).

% Importation des modules nécessaires
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).

% Rendre les faits dynamique
:- dynamic has_motive/2.
:- dynamic was_near_crime_scene/2.
:- dynamic has_fingerprint_on_weapon/2.
:- dynamic has_bank_transaction/2.
:- dynamic owns_fake_identity/2.
:- dynamic eyewitness_identification/2.

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

% Déclaration de la route de liste des personnes accusées
:- http_handler(root(list_personnes_jugee), list_personnes, []).

% Déclaration de la route de liste des crimes
:- http_handler(root(list_crime), list_crimes, []).

% Déclaration de la route de liste des faits pour un accusé
:- http_handler(root(list_faits), list_facts, []).

% Déclaration de la route pour ajouter un fait dynamiquement
:- http_handler(root(ajouter_faits), add_fact, []).

% Route(middleware) : /juger
judge(Request) :-
    cors_enable(Request, [methods([get,post,options])]),  % Autoriser GET, POST, OPTIONS
    http_read_json_dict(Request, DictIn),

    atom_string(Nom_atom, DictIn.nom),
    atom_string(Crime_atom, DictIn.crime),
    
    is_guilty(Nom_atom, Crime_atom) ->
        reply_json_dict(_{result : "guilty"}, []);
        reply_json_dict(_{result : "not_guilty"}, []).


% Lister toutes les personnes accusées (middleware) : /list_personnes_jugee
list_personnes(Request) :-
    cors_enable(Request, [methods([get,options])]),
    findall(_{nom:Nom, crime:CrimeType}, has_motive(Nom, CrimeType), Liste),
    reply_json_dict(Liste, []).

% Lister toutes les crimes (middleware) : /list_crime
list_crimes(Request) :-
    cors_enable(Request, [methods([get,options])]),
    findall(CrimeType, crime_type(CrimeType), Liste),
    reply_json_dict(Liste, []).



% Prédicat helper pour trouver tous les faits concernant une personne et un crime
get_fact_for_person_crime(Nom, Crime, has_motive) :-
    has_motive(Nom, Crime).

get_fact_for_person_crime(Nom, Crime, was_near_crime_scene) :-
    was_near_crime_scene(Nom, Crime).

get_fact_for_person_crime(Nom, Crime, has_fingerprint_on_weapon) :-
    has_fingerprint_on_weapon(Nom, Crime).

get_fact_for_person_crime(Nom, Crime, has_bank_transaction) :-
    has_bank_transaction(Nom, Crime).

get_fact_for_person_crime(Nom, Crime, owns_fake_identity) :-
    owns_fake_identity(Nom, Crime).

get_fact_for_person_crime(Nom, Crime, eyewitness_identification) :-
    eyewitness_identification(Nom, Crime).

add_fact_for_person_crime(Nom, Crime, has_motive) :-
    assertz(has_motive(Nom, Crime)).

add_fact_for_person_crime(Nom, Crime, was_near_crime_scene) :-
    assertz(was_near_crime_scene(Nom, Crime)).

add_fact_for_person_crime(Nom, Crime, has_fingerprint_on_weapon) :-
    assertz(has_fingerprint_on_weapon(Nom, Crime)).

add_fact_for_person_crime(Nom, Crime, has_bank_transaction) :-
    assertz(has_bank_transaction(Nom, Crime)).
    
add_fact_for_person_crime(Nom, Crime, owns_fake_identity) :-
    assertz(owns_fake_identity(Nom, Crime)).

add_fact_for_person_crime(Nom, Crime, eyewitness_identification) :-
    assertz(eyewitness_identification(Nom, Crime)).

get_all_facts(Nom, Crime, Facts) :-
    findall(FactString, (get_fact_for_person_crime(Nom, Crime, Fact), atom_string(Fact, FactString)), FactList),
    list_to_set(FactList, Facts).

list_facts(Request) :-
    cors_enable(Request, [methods([get, post, options])]),
    http_read_json_dict(Request, JSONDict),
    atom_string(Nom_atom, JSONDict.nom),
    atom_string(Crime_atom, JSONDict.crime),
    get_all_facts(Nom_atom, Crime_atom, Facts),
    reply_json_dict(_{nom: JSONDict.nom, crime: JSONDict.crime, facts: Facts}, []).


% Ajouter un fait
add_fact(Request) :-
    cors_enable(Request, [methods([post,options])]),
    http_read_json_dict(Request, DictIn),
    atom_string(PreAtom, DictIn.pre),
    atom_string(NomAtom, DictIn.nom),
    atom_string(CrimeAtom, DictIn.crime),
    add_fact_for_person_crime(NomAtom, CrimeAtom, PreAtom),
    reply_json_dict(_{status:"Fait ajouté avec succès"}, []).


% Lancer le serveur sur le port 8080
server(Port) :-
    http_server(http_dispatch, [port(Port)]).