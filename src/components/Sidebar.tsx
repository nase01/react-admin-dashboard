import { useNavigate, useLocation, Link } from "react-router-dom";

import { ChevronRight } from "lucide-react";
import { useSidebarExpanded, useActiveSubMenu } from "@/components/ToggleProvider";
import { useEffect } from "react";
import { getNavLinks, updatePageTitle } from "@/lib/utils";


const Sidebar = () => {
	const navigate = useNavigate();
  const location = useLocation();
	const { sidebarExpanded } = useSidebarExpanded();
  const { activeSubMenu, setActiveSubMenu } = useActiveSubMenu();
  const navLinks = getNavLinks();
  
	const toggleSubMenu = (item: any) => {
    if (activeSubMenu === item.label) {
      setActiveSubMenu("");
    } else {
      setActiveSubMenu(item.label);
    }
  };

  useEffect(() => {
    updatePageTitle(location); 
  }, [location.pathname]);

  return (
    <aside
      className={`max-md:hidden sm:hidden min-xs:hidden h-full lg:flex md:inset-y-0 z-80 ${
        sidebarExpanded ? "w-72" : "w-16 "
      }`} >
				<nav className="h-full">
					<div className={`max-h-screen fixed pt-2 pb-20 
						${ sidebarExpanded ? "w-72 overflow-y-auto overflow-x-hidden " : "w-auto"  }`}>
							<ul className="flex-1 px-3">
								{navLinks.map((item) => (
									<li key={item.route} >
										<div className={`
										relative flex items-center p-3 my-4 font-medium group cursor-pointer whitespace-nowrap
										${ sidebarExpanded ? "rounded-lg" : "rounded-full" }
										${ location.pathname === item.route ? "bg-main text-white" : item.subMenu &&
										item.subMenu.some((subItem) => subItem.route === location.pathname)
										? "bg-main text-white" : "hover:bg-accent text-gray-400"}`}
										onClick={item.subMenu ? () => toggleSubMenu(item) : () => navigate(item.route)}
										>
											{item.icon && (
												<div>
													<item.icon />
												</div>
											)}

											<span
												className={`overflow-hidden transition-all ${
													sidebarExpanded ? "w-52 ml-3" : "w-0"
												}`}
											>
												{item.label}
											</span>

											{!sidebarExpanded && (
												<div
													className={`
														absolute left-full rounded-md px-2 ml-6 
														bg-indigo-50 dark:bg-slate-900 text-indigo-800 dark:text-white text-sm
														invisible opacity-20 -translate-x-3 transition-all whitespace-nowrap
														group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50
													`}
												>
													{!item.subMenu ? (
														<div className="p-2">{item.label}</div>
													) : (
														item.subMenu.map((subItem) => (
															<Link
																key={subItem.label}
																to={subItem.route}
																className="p-2 block "
																onClick={() => navigate(subItem.route)}
															>
																{subItem.label}
															</Link>
														))
													)}
												</div>
											)}

											{item.subMenu && sidebarExpanded && (
												<div
													className={`transition-all duration-200 ${
														activeSubMenu === item.label && "transform rotate-90"
													}`}
												>
													<ChevronRight />
												</div>
											)}

										</div>
										
										{item.subMenu && sidebarExpanded && activeSubMenu === item.label && (
											<ul className="-mt-3 ml-8 border-l-2 ">
												{item.subMenu.map((subItem) => (
													<li
														key={subItem.label}
														className="p-3"
													>
														<Link to={subItem.route}
															className={`relative flex items-center w-52 ml-3 text-sm
															${location.pathname === subItem.route ? "text-main" : "text-gray-400"}
														`}
														>
															{subItem.label}
														</Link>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
					</div>
				</nav>
		</aside>
  )
}

export default Sidebar