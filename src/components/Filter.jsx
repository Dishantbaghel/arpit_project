import React from "react";

const filterData = [
  { title: "Product Name" },
  { title: "CAS Numbers" },
  { title: "Product Description" },
  { title: "Region" },
  { title: "Country" },
  { title: "Indian Port" },
  { title: "Indian Company" },
  { title: "Foreign Company" },
];

const Filter = () => {
  return (
    <div className="rounded-md">
      {filterData.map((item, i) => (
        <div key={i} className="collapse collapse-arrow bg-white rounded-md border-b-2">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-md font-medium">{item.title}</div>
          <div className="collapse-content">
            {Array.from({ length: 4 }).map((_, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-sm"
                />
                <span>Product Name {index + 1}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="p-4">
        <label>Price range</label>
        <input type="range" className="range range-xs range-primary" />
      </div>
    </div>
  );
};

export default Filter;
