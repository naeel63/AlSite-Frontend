const navigateButtons = document.querySelectorAll('.nav-button');
const contentContainers = document.querySelectorAll('.content');

const navButtonCatalog = document.querySelector('#navButtonCatalog')
const navButtonCart = document.querySelector('#navButtonCart')

const catalogButton = document.querySelector('#catalogButton')
const groupsButton = document.querySelector('#groupsButton')

const catalogGeneralDivision = document.querySelector('#catalogGeneralDivision')
const groupsGeneralDivision = document.querySelector('#groupsGeneralDivision')

const cartCount = document.querySelector('#cartCount')

let catalogData = [];
let cart = new Map();
let actualDate = [];
let contacts = [];
//let groupsGeneral = [];

