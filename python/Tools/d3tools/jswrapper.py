import string
import random
from IPython.display import display_javascript, display_html, display

def id_generator(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


class JSView(object):
    def __init__(self, codestring, height=300):
        self.__uuid = id_generator(12)
        self.__codestring = codestring
        self.__height = height

    @property
    def uuid(self):
        return self.__uuid

    @property
    def height(self):
        return self.__height

    @property
    def codestring(self):
        return self.__codestring

    @codestring.setter
    def codestring(self, value):
        self.__codestring = value

    def _ipython_display_(self):
        htmlcontent = '<div id="{arg1}" style="height: ' + str(self.height) + 'px; width:95%;"></div>'
        display_html(htmlcontent.format(arg1=self.uuid),
            raw=True
        )
        display_javascript(self.codestring % (self.uuid), raw=True)


class JSFileView(JSView):
    def __init__(self, filename, height=300):
        with open (filename, "r") as jsfile:
            filecontents = jsfile.read()
        filecontents = filecontents.replace("HTMLELEMENT","%s")
        super(JSFileView, self).__init__(filecontents, height)


class JSDataView(JSView):
    def __init__(self, filename, jsonfilename, height=300):
        with open (filename, "r") as jsfile:
            filecontents = jsfile.read()
        filecontents = filecontents.replace("HTMLELEMENT","%s")
        filecontents = filecontents.replace("JSONDATAFILE",jsonfilename)
        super(JSDataView, self).__init__(filecontents, height)