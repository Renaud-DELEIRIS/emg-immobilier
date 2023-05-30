const Sidebar = () => {
  return (
    <>
      <aside
        className={`md:sidebar-width header-padding footer-padding fixed inset-0 z-20 h-screen w-0 overflow-hidden bg-[rgb(245,245,245)] transition-[width] md:overflow-auto`}
      >
        {/* <div className="flex flex-col p-12 pt-20">
          <Recap />
        </div> */}
      </aside>
    </>
  );
};

export default Sidebar;
