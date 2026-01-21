  ┃  I want you to create a plan to re-format  @src/app/rides/page.tsx page. this is the main
  ┃  page, where users can select a specific destination or church they want to organize rides
  ┃  for. based on the selected church, there should be a button that says "fetch information
  ┃  from ridesheet" and it makes a curl request that looks something like this:

```zsh
curl "http://localhost:3001/sheets/values?range=CBC\!B37:E65"

<REDACTED>
```

The query parameter range must be in the form of <church_name>!<cell_range>
1. the church_name can be one of 3 values: "RCG", "CBC", "LPC"
2. the cell range should always be A20:D34 for RCG, B37:E65 for CBC, and B28:G52 for LPC

You can freely use the components outlined in @/src/components/ui to display the fetched information how you see fit

You should also update the zustand state variable `membersFromGroup` in @src/utils/store.ts, which stores the current riders selected. The information fetched from the curl request should be used

The zustand state `membersFromGroup` should be wiped clean when the user changes the group (code for this can be found in @src/components/ConfigPanel.tsx
