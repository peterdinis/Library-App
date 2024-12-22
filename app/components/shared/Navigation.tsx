"use client";

import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { type FC, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navigation: FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				/>
			</NavbarContent>

			<NavbarContent className="sm:hidden pr-3" justify="center">
				<NavbarBrand>
					<p className="font-bold text-inherit">SPŠT Knižnica</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="start">
				<NavbarBrand>
					<p className="font-bold text-inherit text-xl">SPŠT Knižnica</p>
				</NavbarBrand>
				<NavbarItem className="ml-4">
					<Link color="foreground" href="/books">
						Knihy
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="/categories">
						Kategórie
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						Spisovatelia
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						Vydavateľstvá
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Button as={Link} color="primary" variant="flat" href="#">
						Prihlásenie
					</Button>
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">
					<Button as={Link} color="secondary" href="#" variant="flat">
						Registrácia
					</Button>
				</NavbarItem>
				<NavbarItem>
					<ThemeToggle />
				</NavbarItem>
			</NavbarContent>

			<NavbarMenu>
				<NavbarMenuItem>
					<Link className="w-full" color="primary" href="#" size="lg">
						Knihy
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem className="mt-2">
					<Link className="w-full" color="primary" href="#" size="lg">
						Kategórie
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem className="mt-2">
					<Link className="w-full" color="primary" href="#" size="lg">
						Spisovatelia
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem className="mt-2">
					<Link className="w-full" color="primary" href="#" size="lg">
						Vydavatelstvá
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem className="hidden lg:flex">
					<Button as={Link} color="primary" variant="flat" href="#">
						Prihlásenie
					</Button>
				</NavbarMenuItem>
				<NavbarMenuItem className="hidden lg:flex">
					<Button as={Link} color="secondary" href="#" variant="flat">
						Registrácia
					</Button>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<ThemeToggle />
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
};

export default Navigation;
