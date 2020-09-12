I started this assignment by following the starter code,  and applying it to the html file I was scraping.

I noticed that the only tag that the address is in is <td> so I used cheerio to find all the <td>s.

Then I noticed that every address was under where the style = "border-bottom:1px solid #e3e3e3; width:260px”

I found that there is no function in cheerio to find areas in the html with a certain style (because style is coded with css), so I started by printing out all the html under the td tags and trying to get rid of the unnecessary content to get just the addresses. 

I found this really difficult because there was just so much text so I researched how to use the style tag to get to just the addresses.

I found that there is an overall javascript function attr() aka attribute.

Because parsing through the text looking for style is not a feature of cheerio, I could not use cheerio to just find the sections with the specific style I was looking for and just print them out.

So, instead, I decided to use cheerio to find the sections with the td tag and then within those sections look for the parts with the specific style using an if statement with attr(). Then, I printed out just those sections.

This significantly reduced the amount of text that was being printed out. I then noticed that all of the addresses we want are right before the first comma, so I split the result by comma and only printed out the index in the array formed by the split.

After this, there was still a lot of text and I couldn’t figure out how to get just the address from this so I went back to the html code to see if there was anything else I could with. 

I found that the different parts of the address were split up by breaks and I researched how to use this to my advantage.

I couldn’t use cheerio with the breaks because they aren’t a tag with text that cheerio can pick up on. 

I realized that if I print out the text as an html file instead of a text file like in the starter code I could split by breaks, so I did this and then only printed the index of the text in between the breaks that I wanted (which was the third text after the breaks or index 2).

And then I had just the address I wanted! Overall, I used cheerio to get the html code after each td tag, found the html code under the specific style of "border-bottom:1px solid #e3e3e3; width:260px”, took that code in as html text and split that by breaks, found the text I wanted in that split array, and split that text by commas to get just the address I wanted.

Then I printed out all the addresses to a text file using the format used in the starter code.
