"use client";

import {
	Button,
	CircularProgress,
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
import { UserButton, useUser } from "@clerk/nextjs"

const Navigation: FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { isSignedIn, user, isLoaded } = useUser();

	if (!isLoaded) {
		return <CircularProgress />
	}
	return (
		<Navbar
			shouldHideOnScroll
			isBordered
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				/>
			</NavbarContent>

			<NavbarContent className="sm:hidden pr-3" justify="center">
				<NavbarBrand>
					<p className="font-bold text-inherit">
						<Link className="text-xl" href="/">
							SPŠT Knižnica
						</Link>
					</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="start">
				<NavbarBrand>
					<p className="font-bold text-inherit text-xl">
						<Link className="text-xl" href="/">
							Spšt Knižnica
						</Link>
					</p>
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
					<Link color="foreground" href="/authors">
						Spisovatelia
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="/publishers">
						Vydavateľstvá
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify="end">
				{!isSignedIn ? (
					<UserButton />
				): (
					<>
					<NavbarItem className="hidden lg:flex">
					<Button as={Link} color="primary" variant="flat" href="/sign-in">
						Prihlásenie
					</Button>
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">
					<Button as={Link} color="secondary" href="/sign-up" variant="flat">
						Registrácia
					</Button>
				</NavbarItem>
					</>
				)}
				<NavbarItem>
					<ThemeToggle />
				</NavbarItem>
			</NavbarContent>

			<NavbarMenu>
				<NavbarMenuItem>
					<Link className="w-full" color="primary" href="/books" size="lg">
						Knihy
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem className="mt-2">
					<Link className="w-full" color="primary" href="/categories" size="lg">
						Kategórie
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem className="mt-2">
					<Link className="w-full" color="primary" href="/authors" size="lg">
						Spisovatelia
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem className="mt-2">
					<Link className="w-full" color="primary" href="/publishers" size="lg">
						Vydavatelstvá
					</Link>
				</NavbarMenuItem>
				{!isSignedIn ? (
					<UserButton />
				): (
					<>
					<NavbarMenuItem className="hidden lg:flex">
					<Button as={Link} color="primary" variant="flat" href="/sign-in">
						Prihlásenie
					</Button>
				</NavbarMenuItem>
				<NavbarMenuItem className="hidden lg:flex">
					<Button as={Link} color="secondary" href="/sign-up" variant="flat">
						Registrácia
					</Button>
				</NavbarMenuItem>
					</>
				)}
				<NavbarMenuItem>
					<ThemeToggle />
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	);
};

export default Navigation;
