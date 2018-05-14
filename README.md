# KP-Sales
App for Fitbit OS with KPay sales report

Requires an OWM API key and a KPay API key. The first is to be hard coded in the app/index.js and the second one is entered via the settings page.

Currently it is a sort of a shared test project. On iOS (iPhone X) the messaging is very bad. So in the companion is now a wakeInterval set which informs the device of the being awake of the companion. This wakeInterval event can be fired while the companion is actively running  or while the companion is sleeping/dead. In this version the companion sends back the state in which it was at the moment of waking. It is displayed in the middle left of the clock dial. Press a right button to toggle the display of numbers of wakes while the companion was already running (wr N) or when it truly was woken (ra N).

On the previous version of the Fitbit app I have seen it being fired. On the current version of the Fitbit app the event is never fired.

Tap the screen for a forced Kpay data refresh. Works always if comms are up.

Do not forget to grant Internet, Location and Background rights in the package.json.
