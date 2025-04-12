import { Role } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Loader from "~/components/ui/loader";
import { toast } from "~/hooks/shared/use-toast";
import { api } from "~/trpc/react";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "fullName",
    header: "Celé meno",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rola",
  },
  {
    id: "actions",
    header: "Akcie",
    cell: ({ row }) => {
      const user = row.original;
      const [openDelete, setOpenDelete] = useState(false);
      const [openRole, setOpenRole] = useState(false);

      const utils = api.useUtils();

      const deleteUser = api.user.deleteUserById.useMutation({
        onSuccess: async () => {
          toast({ title: "Používateľ úspešne zmazaný" });
          await utils.user.getAllUsers.invalidate();
          setOpenDelete(false);
        },
        onError: () => {
          toast({ title: "Chyba pri mazání používateľa" });
        },
      });

      const grantAdmin = api.admin.setAdminRole.useMutation({
        onSuccess: async () => {
          toast({ title: "Admin práva boli pridané" });
          await utils.user.getAllUsers.invalidate();
          setOpenRole(false);
        },
        onError: () => {
          toast({ title: "Nepodarilo sa pridať admin práva" });
        },
      });

      const revokeAdmin = api.admin.removeAdminRole.useMutation({
        onSuccess: async () => {
          toast({ title: "Admin práva boli odobraté" });
          await utils.user.getAllUsers.invalidate();
          setOpenRole(false);
        },
        onError: () => {
          toast({ title: "Nepodarilo sa odobrať admin práva" });
        },
      });

      const setTeacher = api.admin.setTeacherRole.useMutation({
        onSuccess: async () => {
          toast({ title: "Rola TEACHER bola nastavená" });
          await utils.user.getAllUsers.invalidate();
          setOpenRole(false);
        },
        onError: () => {
          toast({ title: "Nepodarilo sa nastaviť rolu TEACHER" });
        },
      });

      const handleSetTeacher = () => setTeacher.mutate({ userId: user.id });

      const handleDelete = () => deleteUser.mutate({ id: user.id });
      const handleMakeAdmin = () => grantAdmin.mutate({ userId: user.id });
      const handleRemoveAdmin = () => revokeAdmin.mutate({ userId: user.id });

      return (
        <div className="flex gap-2">
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Zmazať
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Si si istý?</DialogTitle>
                <DialogDescription>
                  Tento krok nenávratne odstráni používateľa{" "}
                  <strong>{user.fullName}</strong>.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpenDelete(false)}>
                  Zrušiť
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteUser.isPending}
                >
                  {deleteUser.isPending ? <Loader /> : "Zmazať"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {user.role === "TEACHER" && (
            <Dialog open={openRole} onOpenChange={setOpenRole}>
              <DialogTrigger asChild>
                <Button size="sm">Urobiť adminom</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Potvrdenie</DialogTitle>
                  <DialogDescription>
                    Chceš nastaviť používateľovi{" "}
                    <strong>{user.fullName}</strong> rolu <strong>ADMIN</strong>
                    ?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setOpenRole(false)}>
                    Zrušiť
                  </Button>
                  <Button
                    onClick={handleMakeAdmin}
                    disabled={grantAdmin.isPending}
                  >
                    {grantAdmin.isPending
                      ?  <Loader />
                      : "Nastaviť ako admin"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {user.role === "ADMIN" && (
            <Dialog open={openRole} onOpenChange={setOpenRole}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Odobrať admin práva
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Potvrdenie</DialogTitle>
                  <DialogDescription>
                    Chceš odobrať používateľovi <strong>{user.fullName}</strong>{" "}
                    rolu <strong>ADMIN</strong>?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setOpenRole(false)}>
                    Zrušiť
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleRemoveAdmin}
                    disabled={revokeAdmin.isPending}
                  >
                    {revokeAdmin.isPending
                      ? <Loader />
                      : "Odobrať admin práva"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {user.role !== "TEACHER" && user.role !== "ADMIN" && (
            <Dialog open={openRole} onOpenChange={setOpenRole}>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary">
                  Nastaviť ako učiteľa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Potvrdenie</DialogTitle>
                  <DialogDescription>
                    Chceš používateľovi <strong>{user.fullName}</strong> nastaviť rolu{" "}
                    <strong>TEACHER</strong>?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setOpenRole(false)}>
                    Zrušiť
                  </Button>
                  <Button
                    onClick={handleSetTeacher}
                    disabled={setTeacher.isPending}
                  >
                    {setTeacher.isPending ? <Loader />: "Nastaviť ako TEACHER"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      );
    },
  },
];
