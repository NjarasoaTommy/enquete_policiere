:- discontiguous has_motive/2.
:- discontiguous was_near_crime_scene/2.
:- discontiguous has_fingerprint_on_weapon/2.
% has_bank_transaction : Pas besoin car les declarations sont successives:ligne 28 et ligne 30 (ligne est vide)
% owns_fake_identity : Pas besoin car un seul fait est declaré: ligne 32

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
was_near_crime_scene(john, vol).
has_fingerprint_on_weapon(john, vol).

has_motive(mary, assassinat).
was_near_crime_scene(mary, assassinat).
has_fingerprint_on_weapon(mary, assassinat).

has_motive(alice, escroquerie).
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


% Entrée principale
main :-
    current_input(Input),
    read(Input, crime(Suspect, CrimeType)),
    (   is_guilty(Suspect, CrimeType) ->
        writeln(guilty)
    ;   writeln(not_guilty)
    ),
    halt.
