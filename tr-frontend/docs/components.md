# Component Reference

### Activation
* Screen for representing a particular activation card (see file "unc-activation-front.png" for example)
* Navigated to by activation id from a Hospital component
* Upon mounting, sends request to /activations/:aid to get data 
* @props: 
    * navigation object with "id" parameter
* @state: 
    * id       :: String
    * name     :: String
    * rac      :: String 
    * criteria :: [String]
    * notes    :: String

* Notes: data is static/non-interactive, so state does not change due to user interaction

### ActivationItem
* Stylized list component that a user clicks on to render an entire Activation page 
* Color colored red/yellow based on severity of activation criteria (i.e. Adult Red, Pediatric Yellow)
* Displayed on hospital pages below contact information 
* @props:
    * navigation :: React Navigation item
    * key        :: Number
    * id         :: Number, corresponds to activation id
    * code       :: String, activation codenmae (e.g. Adult Red)
    * @navigation :: React Navigation Item

### App
* Entry point to the app
* Creates a tab navigator and navigation stacks for the home and directory pages 
* Not much going on here besides React Navigation boilerplate 

### Directory 
* The primary component for rendering the listing of all Hospitals 
* Loads data in from /mobile/hospitals upon mounting
* Displays hospitals in alphabetical order like the Contacts app does 

### DirectoryItem
* Stylized list component that a user clicks on to render an entire Hospital page 
* Used on both the Home page and Directory page with conditional styling 
    * On home page, the hospital distance is displayed and fonts are smaller
    * On directory page, fonts and padding are bigger
* Recieves the hospital and navigation objects on its props 

### Home
* Landing page for the app 
* Requests location permissions asynchronously from user if they're not enabled already 
* Once nearby hospitals are loaded, it sorts them by trauma level and distance
* Also displays the RAC logo 

### Hospital
* Information page for a single hospital 
* Majority of data is loaded in at the directory level and passed into this component via props
* Upon mounting, queries the backend based on RAC name to find the list of all relevant activation codes
* Integrates with MapView component to display hospital location
* Displays phone numbers that may be tapped on to prompt a call 

### Search
* Contains a search bar that is automatically active when navigated to 
* Originally was supposed to be another tab page, but backend functionality was incomplete 
* Not used in alpha deployment, but may return in future versions 