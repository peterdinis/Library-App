import type { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const AboutWrapper: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <h3 className="text-center text-4xl font-bold">O knižnici</h3>
        <Card className="border-none bg-primary/5 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              Prečo bola táto aplikácia vytvorená
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              Táto knižnica patrí našej strednej škole a bola vytvorená s cieľom
              sprístupniť študentom, učiteľom a zamestnancom jednoduchý prístup
              k širokej škále kníh a učebných materiálov. Naším hlavným cieľom
              je podporiť vzdelávanie, rozšíriť možnosti samoštúdia a vytvoriť
              komunitu čitateľov, ktorí majú záujem o literatúru a poznanie.
              Vďaka tejto aplikácii môžu používatelia pohodlne vyhľadávať knihy,
              spravovať svoje výpožičky a objavovať nové tituly, ktoré obohatia
              ich štúdium aj voľný čas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutWrapper;
