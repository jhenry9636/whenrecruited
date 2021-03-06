// allow only alphanumeric characters, spaces and few other characters like comma,
// period and hash symbol in the form input field
exports.address = [
  /[a-zA-Z\d\s\-\,\#\.\+]+/,
  'Please check the address you provided.']

// allows ZIP codes in standard formats and it matches both US and Indian pincodes
exports.zipCode = [
  /^\d{5,6}(?:[-\s]\d{4})?$/,
  'Please enter a valid zip code']

// accept date input in the mm/dd/yyyy or mm-dd-yyyy formats.
exports.date = [
  /((0[1-9])|(1[0-2]))[\/-]((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))[\/-](\d{4})/,
  'Must provide date in mm-dd-yyyy format.']

exports.emailAddress = [
  /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/,
  'Must provide a valid email address.']

exports.password = [
  /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"/,
  'Password must be a minimum of 6 characters long with at least 1 Alphabet and 1 Number']

exports.requiredField = [function(val) {
  var testVal = val.trim();
  return (testVal.length > 0)
},
'Must provide {PATH}']

exports.state = {
  values : [
    "AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"],
  message: 'Must provide a valid state abbreviation.'
}


exports.phoneNumber = [
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
  'Must provide a valid phone number'
]

exports.password = [function(val) {
  return (val.length >= 6)
}, "Password must be six characters"]

exports.compType = [
  'fulltime',
  'contract'
]

exports.isObjectId = [function(val) {
    return (val.length >= 6) && /^[0-9a-fA-F]{24}$/.test(val);
  }, "Must provide a valid Object Id"]

exports.technologies = ['HTML',
  'HTML4',
  'HTML5',
  'CSS 3',
  'Javascript',
  'Ajax',
  'jQuery',
  'Bootstrap',
  'Foundation',
  'React',
  'Flux',
  'W3C',
  'UX / Usability',
  'Website Performance',
  'Website Optimization',
  'Modernizr',
  'ECMAScript 6',
  'Browserify',
  'Mocha',
  'QUnit',
  'JSLint',
  'Sass',
  'Less',
  'Stylus',
  'Git',
  'Github',
  'Subversion',
  'Canvas',
  'Geolocation',
  'Video',
  'Accessibility',
  'Yeoman',
  'Grunt',
  'Gulp',
  'Make',
  'SASS',
  'LESS',
  'Stylus',
  'Web Workers']