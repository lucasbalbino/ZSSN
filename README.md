# ZSSN (Zombie Survival Social Network) 

This is a project developed by **Lucas Balbino** [(GitHub)](https://github.com/lucasbalbino/ZSSN/) and following the especification in:
https://github.com/Codeminer42/evaluation_test_for_candidates/blob/master/FRONTEND.md

## Framework

This project was developed using [**AngularJS**](https://angularjs.org/) and its componentes and packages.

## Running

To run this project, it's only required to put it in a web server, like **Apache Tomcat**.

I run it locally using a simple zero-configuration command-line server called [_http-server_](https://www.npmjs.com/package/http-server)

I also hosted this project in http://52.38.210.41/zssn


## Structure

The project follows this structure:

* fonts - [Font Awesome](http://fontawesome.io/)'s fonts (used as icons in the project)
* lib - third-party scripts, like Angular Google Maps
* scripts - project's Javascripts
* styles - project's CSS
* views - project's html files
* index.html - project's main page

### Pages

* **add-survivor.html**
Form for addition of a new survivor.

* **trade-items.html**
Page to make the exchange of survivor's items

* **update-location.html**
Page to update the location of a survivor

* **is-infected.html**
Form to indicate a infected person.
This form is contained in the page's header

* **reports.html**
List of reports about the status of survivors and infected people
Here called as "The World as We Know"
It's also in the page's header

* **infection-list**
Additional feature to check if a person is really infected

Each page has a script file in 'scripts'

## Considerations

* I included geoLocation, but only works in https requests. It works in local servers.
* As suggested, I didn't use Twitter Bootstrap's system of columns. Therefore, I couldn't develop the project in a responsive way. 