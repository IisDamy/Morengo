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
    profile
    
};


export const universities =  [
  "Abubakar Tafawa Balewa University (ATBU)",
  "Abia State University (ABSU)",
  "Adekunle Ajasin University (AAUA)",
  "Ahmadu Bello University (ABU)",
  "Afe Babalola University (ABUAD)",
  "Akwa Ibom State University (AKSU)",
  "Ambrose Alli University (AAU)",
  "Auchi Polytechnic",
  "Babcock University",
  "Bauchi State University (BASUG)",
  "Bayero University, Kano (BUK)",
  "Baze University (Abuja)",
  "Benue State University (BSU)",
  "Bowen University",
  "Covenant University",
  "Cross River University of Technology (CRUTECH)",
  "Delta State University (DELSU)",
  "Ekiti State University (EKSU)",
  "Enugu State University of Science and Technology (ESUT)",
  "Federal Polytechnic Bida",
  "Federal Polytechnic Ilaro",
  "Federal University of Agriculture, Abeokuta (FUNAAB)",
  "Federal University of Agriculture, Makurdi (FUAM)",
  "Federal University of Petroleum Resources (FUPRE)",
  "Federal University of Technology, Akure (FUTA)",
  "Federal University of Technology, Minna (FUTMinna)",
  "Federal University of Technology, Owerri (FUTO)",
  "Gombe State University (GSU)",
  "Ibrahim Badamasi Babangida University (IBBU)",
  "Igbinedion University",
  "Imo State University (IMSU)",
  "Kaduna Polytechnic",
  "Kaduna State University (KASU)",
  "Kano University of Science and Technology (KUST)",
  "Kebbi State University of Science and Technology (KSUSTA)",
  "Kogi State University (KSU)",
  "Kwara State University (KWASU)",
  "Ladoke Akintola University of Technology (LAUTECH)",
  "Lagos State University (LASU)",
  "Landmark University",
  "Lead City University",
  "Madonna University",
  "Michael Okpara University of Agriculture (MOUAU)",
  "Modibbo Adama University (MAUTECH)",
  "Nasarawa State University (NSUK)",
  "Niger Delta University (NDU)",
  "Nnamdi Azikiwe University (UNIZIK)",
  "Obafemi Awolowo University (OAU)",
  "Olabisi Onabanjo University (OOU)",
  "Ondo State University of Science and Technology (OSUSTECH)",
  "Osun State University (UNIOSUN)",
  "Pan-Atlantic University",
  "Plateau State University (PLASU)",
  "Redeemer's University",
  "Rivers State University (RSU)",
  "Sokoto State University (SSU)",
  "Taraba State University (TASU)",
  "The Polytechnic Ibadan",
  "Umaru Musa Yar'Adua University (UMYU)",
  "University of Abuja (UNIABUJA)",
  "University of Benin (UNIBEN)",
  "University of Calabar (UNICAL)",
  "University of Ibadan (UI)",
  "University of Ilorin (UNILORIN)",
  "University of Jos (UNIJOS)",
  "University of Lagos (UNILAG)",
  "University of Maiduguri (UNIMAID)",
  "University of Nigeria, Nsukka (UNN)",
  "University of Port Harcourt (UNIPORT)",
  "University of Uyo (UNIUYO)",
  "Usmanu Danfodiyo University (UDUS)",
  "Yaba College of Technology (YABATECH)",
];