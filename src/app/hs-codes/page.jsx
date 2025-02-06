"use client";
import React, { useState } from "react";

const hsSections = [
  {
    section: "Section I: Live Animals; Animal Products",
    chapters: [
      {
        chapter: "Chapter 01: Live Animals",
        codes: [
          {
            code: "0101",
            description: "Live horses, asses, mules, and hinnies",
            subcategories: [
              { subcode: "0101.1", description: "Asses" },
              { subcode: "0101.2", description: "Horses" },
              { subcode: "0101.3", description: "Mules" },
              { subcode: "0101.4", description: "Hinnies" },
            ],
          },
          {
            code: "0102",
            description: "Live bovine animals",
            subcategories: [
              { subcode: "0102.1", description: "Cattle" },
              { subcode: "0102.2", description: "Buffalo" },
              { subcode: "0102.3", description: "Oxen" },
            ],
          },
          {
            code: "0103",
            description: "Live swine",
            subcategories: [
              { subcode: "0103.1", description: "Piglets" },
              { subcode: "0103.2", description: "Sows" },
              { subcode: "0103.3", description: "Boars" },
            ],
          },
        ],
      },
      {
        chapter: "Chapter 02: Meat and Edible Meat Offal",
        codes: [
          {
            code: "0201",
            description: "Meat of bovine animals, fresh or chilled",
            subcategories: [
              { subcode: "0201.1", description: "Beef cuts, bone-in" },
              { subcode: "0201.2", description: "Beef cuts, boneless" },
            ],
          },
          {
            code: "0202",
            description: "Meat of bovine animals, frozen",
            subcategories: [
              { subcode: "0202.1", description: "Frozen beef cuts, bone-in" },
              { subcode: "0202.2", description: "Frozen beef cuts, boneless" },
            ],
          },
          {
            code: "0203",
            description: "Meat of swine, fresh, chilled or frozen",
            subcategories: [
              { subcode: "0203.1", description: "Fresh pork" },
              { subcode: "0203.2", description: "Chilled pork" },
              { subcode: "0203.3", description: "Frozen pork" },
            ],
          },
        ],
      },
    ],
  },
  {
    section: "Section II: Vegetable Products",
    chapters: [
      {
        chapter: "Chapter 07: Edible Vegetables and Certain Roots",
        codes: [
          {
            code: "0701",
            description: "Potatoes, fresh or chilled",
            subcategories: [
              { subcode: "0701.1", description: "Seed potatoes" },
              { subcode: "0701.2", description: "Ware potatoes" },
              { subcode: "0701.3", description: "Sweet potatoes" },
            ],
          },
          {
            code: "0702",
            description: "Tomatoes, fresh or chilled",
            subcategories: [
              { subcode: "0702.1", description: "Cherry tomatoes" },
              { subcode: "0702.2", description: "Beefsteak tomatoes" },
              { subcode: "0702.3", description: "Roma tomatoes" },
            ],
          },
        ],
      },
      {
        chapter: "Chapter 08: Edible Fruits and Nuts",
        codes: [
          {
            code: "0801",
            description: "Coconuts, Brazil nuts, and cashew nuts",
            subcategories: [
              { subcode: "0801.1", description: "Coconuts" },
              { subcode: "0801.2", description: "Brazil nuts" },
              { subcode: "0801.3", description: "Cashew nuts" },
            ],
          },
          {
            code: "0802",
            description: "Other nuts, fresh or dried",
            subcategories: [
              { subcode: "0802.1", description: "Almonds" },
              { subcode: "0802.2", description: "Hazelnuts" },
              { subcode: "0802.3", description: "Walnuts" },
            ],
          },
        ],
      },
    ],
  },
];

export default function NestedAccordion() {
  const [activeState, setActiveState] = useState({
    sectionIndex: null,
    chapterIndex: null,
  });

  const toggleSection = (index) => {
    setActiveState((prev) => ({
      sectionIndex: prev.sectionIndex === index ? null : index,
      chapterIndex: null, // Reset chapter when toggling a section
    }));
  };

  const toggleChapter = (index) => {
    setActiveState((prev) => ({
      ...prev,
      chapterIndex: prev.chapterIndex === index ? null : index,
    }));
  };

  return (
    <div className="m-10 space-y-5">
      {hsSections.map((section, sectionIndex) => (
        <div
          key={section.section}
          className={`collapse collapse-arrow bg-blue-200 rounded-lg ${
            activeState.sectionIndex === sectionIndex
              ? "collapse-open"
              : "collapse-close"
          }`}
        >
          <div
            className="collapse-title text-xl font-bold cursor-pointer"
            onClick={() => toggleSection(sectionIndex)}
          >
            {section.section}
          </div>
          <div className="collapse-content">
            {activeState.sectionIndex === sectionIndex && (
              <div className="space-y-5 pl-5">
                {section.chapters.map((chapter, chapterIndex) => (
                  <div
                    key={chapter.chapter}
                    className={`collapse collapse-arrow bg-blue-100 rounded-lg ${
                      activeState.chapterIndex === chapterIndex
                        ? "collapse-open"
                        : "collapse-close"
                    }`}
                  >
                    <div
                      className="collapse-title text-lg font-semibold cursor-pointer"
                      onClick={() => toggleChapter(chapterIndex)}
                    >
                      {chapter.chapter}
                    </div>
                    <div className="collapse-content">
                      {activeState.chapterIndex === chapterIndex && (
                        <div className="space-y-3 pl-5">
                          {chapter.codes.map((code) => (
                            <div
                              key={code.code}
                              className="bg-blue-50 p-2 rounded"
                            >
                              <strong>{code.code}</strong>: {code.description}
                              {code.subcategories && (
                                <ul className="pl-5 mt-2 list-disc">
                                  {code.subcategories.map((sub) => (
                                    <li key={sub.subcode}>
                                      <strong>{sub.subcode}</strong>:{" "}
                                      {sub.description}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
