import find from "lodash.find";
import filter from "lodash.filter";
import remove from "lodash.remove";

let ownerId = 4;

const ownerList = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

let carId = 10;

const carList = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    ownerId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    ownerId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    ownerId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura",
    model: "MDX",
    price: "60000",
    ownerId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    ownerId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    ownerId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    ownerId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    ownerId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    ownerId: "3",
  },
];

const typeDefs = `
  type Owner {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Car {
    id: String!
    year: String!
    make: String!
    model: String!
    price: String!
    ownerId: String!
  }

  type Query {
    getOwners: [Owner]
    getOwner(id: String!): Owner

    getCars(ownerId: String!): [Car]
  }

  type Mutation {
    addOwner(firstName: String!, lastName: String!): Owner
    updateOwner(id: String!, firstName: String!, lastName: String!): Owner
    removeOwner(id: String!): Owner

    addCar(year: String!, make: String!, model: String!, price: String!, ownerId: String!): Car
    updateCar(id: String!, year: String!, make: String!, model: String!, price: String!, ownerId: String!): Car
    removeCar(id: String!): Car
  }
`;

const resolvers = {
  Query: {
    getOwners: () => ownerList,
    getOwner(root, args) {
      return find(ownerList, { id: args.id });
    },
    getCars(root, args) {
      return filter(carList, (car) => car.ownerId === args.ownerId);
    },
  },
  Mutation: {
    addOwner: (root, args) => {
      const newOwner = {
        id: (ownerId++).toString(),
        firstName: args.firstName,
        lastName: args.lastName,
      };

      ownerList.push(newOwner);

      return newOwner;
    },
    updateOwner: (root, args) => {
      const owner = find(ownerList, { id: args.id });
      if (!owner) {
        throw new Error(`Couldn\'t find owner with id ${args.id}`);
      }

      owner.firstName = args.firstName;
      owner.lastName = args.lastName;

      return owner;
    },
    removeOwner: (root, args) => {
      const removedOwner = find(ownerList, { id: args.id });
      if (!removedOwner) {
        throw new Error(`Couldn\'t find owner with id ${args.id}`);
      }

      remove(carList, (car) => {
        return car.ownerId === removedOwner.id;
      });

      remove(ownerList, (owner) => {
        return owner.id === removedOwner.id;
      });

      return removedOwner;
    },
    addCar: (root, args) => {
      const newCar = {
        id: (carId++).toString(),
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        ownerId: args.ownerId,
      };

      carList.push(newCar);

      return newCar;
    },
    updateCar: (root, args) => {
      const car = find(carList, { id: args.id });
      if (!car) {
        throw new Error(`Couldn\'t find car with id ${args.id}`);
      }

      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.ownerId = args.ownerId;

      return car;
    },
    removeCar: (root, args) => {
      const removedCar = find(carList, { id: args.id });
      if (!removedCar) {
        throw new Error(`Couldn\'t find car with id ${args.id}`);
      }

      remove(carList, (car) => {
        return car.id === removedCar.id;
      });

      return removedCar;
    },
  },
};

export { typeDefs, resolvers };
