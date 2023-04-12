import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

export default function Admin(props: { [x: string]: any }) {
  return (
    <>
      <div className="flex h-full w-full">
        <Sidebar open={true} onClose={() => {}} />
        {/* Navbar & Main Content */}
        <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
          {/* Main Content */}
          <main
            className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
          >
            {/* Routes */}
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => {}}
                brandText={"currentRoute"}
                // secondary={getActiveNavbar(routes)}
                // {...rest}
              />
              <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Routes>
                  {/* {getRoutes(routes)} */}

                  <Route
                    path="/"
                    element={<Navigate to="/admin/default" replace />}
                  />
                </Routes>
              </div>
              <div className="p-3">
                <Footer />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
