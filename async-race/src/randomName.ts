export default function getRandomName() {
  const carBrands = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Volkswagen",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Hyundai",
    "Kia",
    "Volvo",
    "Subaru",
    "Mazda",
    "Jeep",
    "Tesla",
    "Lexus",
    "Porsche",
    "Ferrari",
    "Maserati",
    "Bentley",
    "Rolls-Royce",
    "Aston Martin",
    "Lamborghini",
    "Bugatti",
    "McLaren",
    "Jaguar",
    "Land Rover",
    "Infiniti",
    "Acura",
    "Cadillac",
    "GMC",
    "Lincoln",
    "Buick",
    "Chrysler",
    "Dodge",
    "Ram",
    "Alfa Romeo",
    "Fiat",
    "Mitsubishi",
    "Mini",
    "Smart",
    "Suzuki",
    "Genesis",
    "Koenigsegg",
    "Pagani",
    "Lotus",
    "Maybach",
    "Dacia",
    "Lada",
    "SEAT",
    "Škoda",
    "Fiat",
    "Peugeot",
    "Citroën",
    "Renault",
    "DS Automobiles",
    "Opel",
    "Vauxhall",
    "Fiat",
    "Maserati",
    "Lancia",
    "Ferrari",
    "Abarth",
    "Alpine",
    "Daihatsu",
    "Suzuki",
    "Isuzu",
    "SsangYong",
    "Daewoo",
    "Mahindra",
    "Tata",
    "Force",
    "Lamborghini",
    "Bugatti",
    "Koenigsegg",
    "Pagani",
    "Spyker",
    "Caterham",
    "Ariel",
    "Noble",
    "Morgan",
    "TVR",
    "Gumpert",
    "Wiesmann",
    "Hennessey",
    "Rimac",
    "Lucid",
    "Venturi",
    "Rivian",
  ];

  const carModels = [
    "Camry",
    "Accord",
    "F-150",
    "Silverado",
    "Altima",
    "Jetta",
    "3 Series",
    "C-Class",
    "A4",
    "Elantra",
    "Optima",
    "XC60",
    "Outback",
    "CX-5",
    "Wrangler",
    "Model 3",
    "RX",
    "911",
    "488",
    "Ghibli",
    "Continental GT",
    "Phantom",
    "DB11",
    "Huracan",
    "Chiron",
    "720S",
    "F-Pace",
    "Range Rover",
    "Q50",
    "MDX",
    "Escalade",
    "Sierra",
    "Navigator",
    "Enclave",
    "Pacifica",
    "Charger",
    "1500",
    "Giulia",
    "500",
    "Outlander",
    "Cooper",
    "Fortwo",
    "Swift",
    "G80",
    "Agera RS",
    "Huayra",
    "Evora",
    "S-Class",
    "Duster",
    "Niva",
    "Leon",
    "Octavia",
    "Panda",
    "208",
    "C3",
    "Clio",
    "DS 7 Crossback",
    "Corsa",
    "Astra",
    "Tipo",
    "Levante",
    "Ypsilon",
    "Portofino",
    "595",
    "A110",
    "Cuore",
    "Jimny",
    "D-Max",
    "Rexton",
    "Matiz",
    "Thar",
    "Nexon",
    "Gurkha",
    "Aventador",
    "Veyron",
    "Jesko",
    "Zonda",
    "C8",
    "Seven",
    "Atom",
    "M600",
    "Plus Four",
    "Griffith",
    "Apollo",
    "GT",
    "Venom GT",
    "C_Two",
    "Air",
    "Atlantique",
    "R1T",
  ];

  const randomBrandIndex = Math.floor(Math.random() * carBrands.length);
  const randomModelIndex = Math.floor(Math.random() * carModels.length);

  return carBrands[randomBrandIndex] + " " + carModels[randomModelIndex];
}
