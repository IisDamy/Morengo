// fix declaration issue and delete useless shit
import arrowBack from "@/assets/icons/arrow-back.png";
import arrowDown from "@/assets/icons/arrow-down.png";
import arrowRight from "@/assets/icons/arrow-right.png";
import bag from "@/assets/icons/bag.png";
import check from "@/assets/icons/check.png";
import clock from "@/assets/icons/clock.png";
import envelope from "@/assets/icons/envelope.png";
import home from "@/assets/icons/home.png";
import location from "@/assets/icons/location.png";
import logout from "@/assets/icons/logout.png";
import minus from "@/assets/icons/minus.png";
import pencil from "@/assets/icons/pencil.png";
import person from "@/assets/icons/person.png";
import phone from "@/assets/icons/phone.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import star from "@/assets/icons/star.png";
import trash from "@/assets/icons/trash.png";
import avatar from "@/assets/images/avatar.png";
import burgerOne from "@/assets/images/burger-one.png";
import burgerTwo from "@/assets/images/burger-two.png";
import coleslaw from "@/assets/images/coleslaw.png";
import emptyState from "@/assets/images/empty-state.png";
import fries from "@/assets/images/fries.png";
import loginGraphic from "@/assets/images/login-graphic.png";
import logo from "@/assets/images/logo.png";
import salad from "@/assets/images/salad.png";
import success from "@/assets/images/success.png";
import tomatoes from "@/assets/images/tomatoes.png";
import sparkle from "@/assets/animations/sparkle.json";
import smiley from "@/assets/animations/smiley.json";
import flower from '@/assets/images/flower.png';
import fruit from '@/assets/images/fruit.png';
import bicycle from '@/assets/images/bicycle.png';
import vine1 from '@/assets/images/vines-1.png';
import vine2 from '@/assets/images/vine-2.png';
import plate from '@/assets/images/plate2.png';
import milkshake from '@/assets/images/milkshake.png';
import morengologo from '@/assets/icons/morengologo.png';
import openedBook from '@/assets/images/openedbook.png';
import sodaCup from '@/assets/images/sodacup.png';
import bubbleStar from '@/assets/images/bubblestars.png';
import bubbles2 from '@/assets/images/bubbles2.png';
import bubbles from '@/assets/images/bubbles.png';
import stars1 from '@/assets/images/stars1.png';
import moonstars from '@/assets/images/moonstars.png';
import flower2 from '@/assets/images/flower2.png';
import book from '@/assets/images/book.png';
import profile from '@/assets/icons/profile.png';
import target from '@/assets/icons/target.png'

export const CATEGORIES = [
    {
        id: "1",
        name: "All",
    },
    {
        id: "2",
        name: "Burger",
    },
    {
        id: "3",
        name: "Pizza",
    },
    {
        id: "4",
        name: "Wrap",
    },
    {
        id: "5",
        name: "Burrito",
    },
];

export const TabGrouping = [
    'Recent', 'Favorite','Rating','Popular'
]

export const offers = [
    {
        id: 1,
        title: "SUMMER COMBO",
        image: burgerOne,
        color: "#D33B0D",
    },
    {
        id: 2,
        title: "BURGER BASH",
        image: burgerTwo,
        color: "#DF5A0C",
    },
];

export const sides = [
    {
        name: "Fries",
        image: fries,
        price: 3.5,
    },
    {
        name: "Coleslaw",
        image: coleslaw,
        price: 2.5,
    },
    {
        name: "Salad",
        image: salad,
        price: 4.5,
    },
];

export const toppings = [
    {
        name: "Tomatoes",
        image: tomatoes,
        price: 0.7,
    },
];

export const color = {
    dashboard: '#e2f2f8c2',
    morange: '#fc7323',
    moregreen: '#57a886'
}

export const animations = {
    sparkle,
    smiley
}

export const images = {
    avatar,
    burgerOne,
    burgerTwo,
    coleslaw,
    emptyState,
    loginGraphic,
    logo,
    salad,
    success,
    tomatoes,
    arrowBack,
    arrowDown,
    arrowRight,
    bag,
    check,
    clock,
    envelope,
    home,
    location,
    logout,
    minus,
    pencil,
    person,
    phone,
    plus,
    search,
    star,
    trash,
    vine1,
    vine2,
    flower,
    plate,
    milkshake,
    fruit,
    bicycle,
    morengologo,
    openedBook,
    sodaCup,
    bubbleStar,
    bubbles,
    bubbles2,
    stars1,
    moonstars,
    flower2,
    book,
    profile,
    target
    
};


export const universities =   [
  "Abubakar Tafawa Balewa University, Bauchi, Nigeria",
  "Abia State University, Uturu, Nigeria",
  "Adekunle Ajasin University, Akungba-Akoko, Nigeria",
  "Ahmadu Bello University, Zaria, Nigeria",
  "Afe Babalola University, Ado-Ekiti, Nigeria",
  "Akwa Ibom State University, Ikot Akpaden, Nigeria",
  "Ambrose Alli University, Ekpoma, Nigeria",
  "Auchi Polytechnic, Auchi, Nigeria",
  "Babcock University, Ilishan-Remo, Nigeria",
  "Bauchi State University, Gadau, Nigeria",
  "Bayero University, Kano, Nigeria",
  "Baze University, Abuja, Nigeria",
  "Benue State University, Makurdi, Nigeria",
  "Bowen University, Iwo, Nigeria",
  "Covenant University, Ota, Nigeria",
  "Cross River University of Technology, Calabar, Nigeria",
  "Delta State University, Abraka, Nigeria",
  "Ekiti State University, Ado-Ekiti, Nigeria",
  "Enugu State University of Science and Technology, Enugu, Nigeria",
  "Federal Polytechnic Bida, Bida, Nigeria",
  "Federal Polytechnic Ilaro, Ilaro, Nigeria",
  "Federal University of Agriculture, Abeokuta, Nigeria",
  "Federal University of Agriculture, Makurdi, Nigeria",
  "Federal University of Petroleum Resources, Effurun, Nigeria",
  "Federal University of Technology, Akure, Nigeria",
  "Federal University of Technology, Minna, Nigeria",
  "Federal University of Technology, Owerri, Nigeria",
  "Gombe State University, Gombe, Nigeria",
  "Ibrahim Badamasi Babangida University, Lapai, Nigeria",
  "Igbinedion University, Okada, Nigeria",
  "Imo State University, Owerri, Nigeria",
  "Kaduna Polytechnic, Kaduna, Nigeria",
  "Kaduna State University, Kaduna, Nigeria",
  "Kano University of Science and Technology, Wudil, Nigeria",
  "Kebbi State University of Science and Technology, Aliero, Nigeria",
  "Kogi State University, Anyigba, Nigeria",
  "Kwara State University, Malete, Nigeria",
  "Ladoke Akintola University of Technology, Ogbomoso, Nigeria",
  "Lagos State University, Ojo, Lagos, Nigeria",
  "Landmark University, Omu-Aran, Nigeria",
  "Lead City University, Ibadan, Nigeria",
  "Madonna University, Elele, Nigeria",
  "Michael Okpara University of Agriculture, Umudike, Nigeria",
  "Modibbo Adama University, Yola, Nigeria",
  "Nasarawa State University, Keffi, Nigeria",
  "Niger Delta University, Wilberforce Island, Nigeria",
  "Nnamdi Azikiwe University, Awka, Nigeria",
  "Obafemi Awolowo University, Ile-Ife, Nigeria",
  "Olabisi Onabanjo University, Ago-Iwoye, Nigeria",
  "Ondo State University of Science and Technology, Okitipupa, Nigeria",
  "Osun State University, Osogbo, Nigeria",
  "Pan-Atlantic University, Lekki, Lagos, Nigeria",
  "Plateau State University, Bokkos, Nigeria",
  "Redeemer's University, Ede, Nigeria",
  "Rivers State University, Port Harcourt, Nigeria",
  "Sokoto State University, Sokoto, Nigeria",
  "Taraba State University, Jalingo, Nigeria",
  "The Polytechnic Ibadan, Ibadan, Nigeria",
  "Umaru Musa Yar'Adua University, Katsina, Nigeria",
  "University of Abuja, Abuja, Nigeria",
  "University of Benin, Benin City, Nigeria",
  "University of Calabar, Calabar, Nigeria",
  "University of Ibadan, Ibadan, Nigeria",
  "University of Ilorin, Ilorin, Nigeria",
  "University of Jos, Jos, Nigeria",
  "University of Lagos, Akoka, Lagos, Nigeria",
  "University of Maiduguri, Maiduguri, Nigeria",
  "University of Nigeria, Nsukka, Nigeria",
  "University of Port Harcourt, Port Harcourt, Nigeria",
  "University of Uyo, Uyo, Nigeria",
  "Usmanu Danfodiyo University, Sokoto, Nigeria",
  "Yaba College of Technology, Yaba, Lagos, Nigeria"
];