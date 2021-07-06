const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock("fs");

test("creates zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Carlene", id: "zookeepertestid001" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Carlene");
  expect(zookeeper.id).toBe("zookeepertestid001");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const updatedZookeepers = filterByQuery({ age: 67 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Isabella");
});

test("validates age", () => {
  const zookeeper = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
  };

  const invalidZookeeper = {
    id: "3",
    name: "Isabella",
    age: "67",
    favoriteAnimal: "bear",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
