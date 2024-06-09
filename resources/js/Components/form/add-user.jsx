import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import SiswaForm from "./user/siswa-form";
import GuruForm from "./user/guru-form";

export function UserForm() {
  return (
    <Tabs defaultValue="Siswa">
      <TabsList className="grid w-fit  grid-cols-3">
        <TabsTrigger value="Siswa">Siswa</TabsTrigger>
        <TabsTrigger value="Guru">Guru</TabsTrigger>
        <TabsTrigger value="Staff">Staff</TabsTrigger>
      </TabsList>
      <TabsContent value="Siswa">
        <SiswaForm />
      </TabsContent>
      <TabsContent value="Guru">
        <GuruForm />
      </TabsContent>
      <TabsContent value="Staff">
        <Card>
          <CardHeader>
            <CardTitle>Staff</CardTitle>
            <CardDescription>{`Change your Staff here. After saving, you'll be logged out.`}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current Staff</Label>
              <Input
                id="current"
                type="Staff"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New Staff</Label>
              <Input
                id="new"
                type="Staff"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Staff</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
