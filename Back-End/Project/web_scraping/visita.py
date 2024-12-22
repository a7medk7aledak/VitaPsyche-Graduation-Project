import requests
from lxml import html
def page(url):
    session = requests
    response = session.get(url)
    TITLE='//*[@id="__next"]/div/div[1]/div[2]/div/div/div[2]/h1/text()'
    IMAGE='/html/body/div/div/div[1]/div[2]/div/div/div[7]/div/div[2]/div[1]/img/@src'
    SYMPTOMS_TITLE='/html/body/div/div/div[1]/div[2]/div/div/div[9]/div/div[2]/p[1]'
    END_SYMPTOMS='/html/body/div/div/div[1]/div[2]/div/div/div[9]/div/div[2]/p[3]/text()'
    SYMPTOMS_INCLUDE_2='/html/body/div/div/div[1]/div[2]/div/div/div[9]/div/div[2]/p'
    SYMPTOMS_INCLUDE='/html/body/div/div/div[1]/div[2]/div/div/div[9]/div/div[2]'
    CAUSES='/html/body/div/div/div[1]/div[2]/div/div/div[11]/div[1]/div[2]/ul/li'
    CAUSES_TITLE='/html/body/div/div/div[1]/div[2]/div/div/div[11]/div[1]/div[2]/p/text()'
    DINGER_TITLE='/html/body/div/div/div[1]/div[2]/div/div/div[12]/div/div[2]/p/text()'
    DINGER='/html/body/div/div/div[1]/div[2]/div/div/div[12]/div/div[2]/ul/li'
    TREATMMENT='/html/body/div/div/div[1]/div[2]/div/div/div[14]/div/div[2]'



    tree = html.fromstring(response.content)

    def description_text():
        description=[]
        paragraph_elements = tree.xpath('/html/body/div/div/div[1]/div[2]/div/div/div[7]/div/div[2]/div[2]/p')
        if paragraph_elements:
            for  p_element in paragraph_elements:
                p_text = p_element.text_content()
                description.append(p_text)
        return description
    def Symptoms_include():
        
        title=tree.xpath(SYMPTOMS_TITLE)[0].text_content()
        html_content=None
        element = tree.xpath(SYMPTOMS_INCLUDE)
        
        if element:
            html_content = html.tostring(element[0], pretty_print=True, encoding='unicode')
        else:
            pass
        
        dic={'title':title,
        'Content':html_content,
    
                    }
        return dic
    def Causes():
        title=tree.xpath(CAUSES_TITLE)[0]
        list_items=[]
        li_elements = tree.xpath(CAUSES)
        # Extract and print the text content of each <li> element
        if li_elements:
            for  li in li_elements:
                li_text = li.text_content().strip()  # Extract text and clean it up
                list_items.append(li_text)
        else:
            print("No <li> elements found")
        dic={'title':title,
        'Content':list_items,
                    }
        return dic
    def danger():
        title = tree.xpath(DINGER_TITLE)
        list_items=[]
        li_elements = tree.xpath(DINGER)
        # Extract and print the text content of each <li> element
        if li_elements:
            for  li in li_elements:
                li_text = li.text_content().strip()  # Extract text and clean it up
                list_items.append(li_text)
        else:
            print("No <li> elements found")
        dic={'title':title,
        'Content':list_items,
                    }
        return dic

    def Treatment():
        html_content=None

        element = tree.xpath(TREATMMENT)
        if element:
            html_content = html.tostring(element[0], pretty_print=True, encoding='unicode')
        else:
            pass
        dic={
        'Content':html_content.strip(),
        }
        return dic
    final_dic={
        'title':tree.xpath(TITLE)[0],
        'image':tree.xpath(IMAGE)[0],
        'Description':description_text(),
        'Symptoms':Symptoms_include(),
        'Causes':Causes(),
        'Diagnostics':danger(),
            'Treatment':Treatment()
        }
    return final_dic
def get_all_urls(url):
    session = requests
    list_href=[]
    response = session.get(url)
    tree = html.fromstring(response.content)
    # Use the provided XPath to find all <a> elements within the <ul>
    a_elements = tree.xpath('/html/body/div/div/div[1]/div[2]/div/div/ul/li/a')
    # Extract and print all href attributes from the <a> elements
    hrefs = [a.get('href') for a in a_elements]
    for href in hrefs:
        list_href.append(href)
    return list_href
url='https://www.vezeeta.com/en/medical-topics/diseases/psychiatry/topics'
content=[]
import json
for i in get_all_urls(url):
    content.append(page(i))
   
file_path = 'data.json'

# Write the dictionary to a JSON file
with open(file_path, 'w') as file:
    json.dump(content, file, indent=4)  # indent=4 for pretty-printing
print(f"Data has been written to {file_path}")

