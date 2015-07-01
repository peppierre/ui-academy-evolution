# ui-academy-evolution

These sources demonstrates how a simple PUMIEPE SPA could be created from a generated PUMIEPE SPA.

## What to know?

To make this magic happen, you simply should scaffold a PUMIEPE app.

*Note* that is is quite important to have PUMIEPE generator no older than v0.3.0!

After making this step above, you could step through UI Academy sample app’s evolution.

## Phases

### Phase #0

 * Initial app, scaffolded right now.

### Phase #1

 * All routes are created
    * index
    * signup
    * login
    * logout
    * vehicle list
    * vehicle detail
 * Pages have no other contents but their titles

### Phase #2

 * Index.html updated to contain all side-wide elements
 * Views are ready for all routes, using no models but contains in-line content (e.g. for vehicle list page)

### Phase #3

 * Static models (fixtures) are added
 * Relevant views are updated

### Phase #4

 * Fixtures are replaced with static (file) models.
 * No view changes required

### Phase #5

 * File models are replaced with live API models
 * Relevant views might updated to refer changes

### Phase #6

 * Signup page user interaction: storing values in PUMIEPE.Persistence
 * Login page user interaction: getting values from PUMIEPE.Persistence and storing values to PUMIEPE.Session
 * Relating to 2 topic above, all other pages checks whether a user is currently logged in. If not, redirects to login page automatically.
 * Vehicle detail page user interaction: storing parking zone value in PUMIEPE.Persistence and appending that value to model before rendering page

### Phase #7

 * CSS is replaced by LESS
 * Rules are nested
 * Some values are refactored out into variables.
 * Via LESS built-in functions, some values are depending on others (lighten, darken)
 * Mixins are introduced: solidBorder, borderRadius
 * Importing introduced: core and pages
