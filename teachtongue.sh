str="• bet, bet, bet. • burst, burst, burst. • cost, cost, cost. •
cut, cut, cut. • hit, hit, hit. • hurt, hurt, hurt. • let, let, let.
• put, put, put. • set, set, set. • shut, shut, shut. • spread,
spread, spread. • split, split, split. • upset, upset, upset.
• dig, dug, dug. • fling, flung, flung • spin, spun, spun. •
stick, stuck, stuck. • sting, stung, stung. • swing, swung,
swung. • win, won, won. • wring, wrung, wrung. • bleed,
bled, bled. • breed, bred, bred. • feed, fed, fed. • lead, led,
led. • meet, met, met. • read, read, read. • speed, sped,
sped. • bind, bound, bound. • find, found, found. • grind,
ground, ground. • wind, wound, wound. • sit, sat, sat.
• spit, spat, spat. • fight, fought, fought. • strike, struck,
struck. • get, got, got. • hang, hung, hung. • hang, hanged,
hanged. • hold, held, held. • light, lit, lit. • slide, slid, slid.
• shoot, shot, shot. • shine, shone, shone. • stand, stood,
stood. • understand, understood, understood. • teach,
taught, taught. • catch, caught, caught. • make, made,
made. • bring, brought, brought. • think, thought, thought
• creep, crept, crept. • keep, kept, kept. • leap, leapt, leapt.
• sweep, swept, swept. • sleep, slept, slept. • weep, wept,
wept. • flee, fled, fled. • hear, heard, heard. • say, said,
said. • sell, sold, sold. • tell, told, told. • lean, leant, leant.
• mean, meant, meant. • buy, bought, bought. • leave, left,
left. • lose, lost, lost. • deal, dealt, dealt. • dream, dreamt,
dreamt. • feel, felt, felt. • kneel, knelt, knelt.
• begin, began, begun. • drink, drank, drunk. • ring, rang,
rung. • shrink, shrank, shrunk. • sing, sang, sung. • sink,
sank, sunk. • spring, sprang, sprung. • stink, stank, stunk.
• swim, swam, swum.
• drive, drove, driven. • ride, rode, ridden. • rise, rose,
risen. • write, wrote, written. • fly, flew, flown. • blow,
blew, blown. • grow, grew, grown. • know, knew, known.
• throw, threw, thrown. • draw, drew, drawn. • fall, fell,
fallen. • shake, shook, shaken. • take, took, taken. • see,
saw, seen. • eat, ate, eaten. • forbid, forbade, forbidden.
• forgive, forgave, forgiven. • give, gave, given. • swell,
swelled, swollen. • freeze, froze, frozen. • speak, spoke,
spoken. • steal, stole, stolen. • weave, wove, woven. •
forget, forgot, forgotten. • break, broke, broken. • wake,
woke, woken. • swear, swore, sworn. • tear, tore, torn. •
lie, lay, lain. • choose, chose, chosen. • bite, bit, bitten. •
hide, hid, hidden."
# str="• choose, chose, chosen."


separate () {
    res=''
    echo $1 | sed "s/ /\n/g" | { while read word
    do
        sefd=`echo $word | cut -d"/" -f$2`
        res="${res} ${sefd}"
    done 
    echo "\"$res\"," >> data/${filename}
    }
}

printPhrases () {
    infinitive=`echo $1 | cut -d "," -f1 | sed "s/[ .]//g"`
    echo "\"$infinitive\": [" >> data/${filename}
    past=`echo $1 | cut -d "," -f2 | sed "s/[ .]//g"`
    participle=`echo $1 | cut -d "," -f3 | sed "s/[ .]//g"`
    # =`echo $1 | sed "s/[^ey]$/&ed/g"`
    # infinitive=`echo $infinitive | sed "s/oy$/oyed/g"`
    # # infinitive=`echo $infinitive | sed "s/[^o]y$/lied/g"`
    # infinitive=`echo $infinitive | sed "s/y$/ied/g"`
    # infinitive=`echo $infinitive | sed "s/e$/ed/g"`
    
    echo "\"It ${infinitive}s\"," >> data/${filename}
    echo "\"It $past\"," >> data/${filename}
    echo "\"It has $participle\"" >> data/${filename}
    echo "]," >> data/${filename}
}

filename='IrregularVerbs.json'
echo "{" > data/${filename}
drill () {
    # echo "\"$verb\": [" >> data/${filename}
    echo $str | sed "s/\n//g" | sed "s/•//" | sed "s/•/\n/g" | while read line
    do
        printPhrases "$line"
        # echo "\"$line\"," >> data/${filename}
    done
    # echo "]," >> data/${filename}
}
while read verb
do
 drill $verb
done << EOF
have
EOF
echo "}" >> data/${filename}

echo ",
  {
    name: '${filename}',
    component: Units
  }"