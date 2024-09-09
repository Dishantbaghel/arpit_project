import React from "react";
import BarChart from "./Barchart";
import DonutChart from "./DonutChart";

const Modal = () => {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="py-4"></p>
          <BarChart />
          {/* <DonutChart /> */}
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
