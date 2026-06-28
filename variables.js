const navigateButtons = document.querySelectorAll('.nav-button');
const contentContainers = document.querySelectorAll('.content');

const navButtonCatalog = document.querySelector('#navButtonCatalog')
const navButtonCart = document.querySelector('#navButtonCart')

const catalogGeneralDivision = document.querySelector('#catalogContent')
const groupsGeneralDivision = document.querySelector('#groupsGeneralDivision')

const cartItemCountInCatalogContainer = document.querySelector('#cartItemCountInCatalog')

const groupsDiv = document.querySelector('#groups')

/**
 * @typedef {Object} purchase
 * @property {string} name
 * @property {string} code
 * @property {number} price
 * @property {number} groupId
 * @property {number} ostatok 
 * @property {number} quantity
 */
/** @type {Map<number, purchase>} */
const products = new Map();

let cart = new Map();
let actualDate = [];
let contacts = [];
let cartItemQuantity = 0;

/**
 * @typedef {Object} Group
 * @property {number} id
 * @property {string} name
 * @property {Array<Group>} children
 */



