const navigateButtons = document.querySelectorAll('.nav-button');
const contentContainers = document.querySelectorAll('.content');

const navButtonCatalog = document.querySelector('#navButtonCatalog')
const navButtonCart = document.querySelector('#navButtonCart')

const catalogGeneralDivision = document.querySelector('#catalogContent')
const groupsGeneralDivision = document.querySelector('#groupsGeneralDivision')

const cartItemCountInCatalogContainer = document.querySelector('#cartItemCountInCatalog')

let catalogData = [];
let cart = new Map();
let actualDate = [];
let contacts = [];
let cartItemQuantity = 0;
