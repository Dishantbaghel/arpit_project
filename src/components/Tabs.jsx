import React, { useState } from 'react';
// import { FaFileCircleMinus, FaSave } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState('Tab 2');

  return (
    <div className="flex justify-between">
      <div role="tablist" className="tabs tabs-lifted">
        <a
          role="tab"
          className={`tab ${activeTab === 'Tab 1' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('Tab 1')}
        >
          Tab 1
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'Tab 2' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('Tab 2')}
        >
          Tab 2
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 'Tab 3' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('Tab 3')}
        >
          Tab 3
        </a>
      </div>
      <div className="flex justify-center gap-2 items-center">
        <div className="btn-sm text-center items-center">
          {/* <FaFileCircleMinus /> */}
        </div>
        <div className="btn-sm">
          <CiStar />
        </div>
        <div className="btn-sm">
          {/* <FaSave /> */}
        </div>
        <button className="btn btn-sm text-white bg-blue-800 hover:bg-blue-900 ">Magic Search</button>
        <button className="btn btn-sm text-white bg-blue-800 hover:bg-blue-900 ">Apply Filter</button>
      </div>
    </div>
  );
};

export default TabsComponent;
