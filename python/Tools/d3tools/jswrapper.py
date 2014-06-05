import string
import random
from IPython.core.display import display_html, display_javascript, Javascript

# Useful page:  http://www.xavierdupre.fr/blog/2013-11-30_nojs.html
# TODO: you may want to pass the d3 and other js libs via the constructor
#       with lib instead of using require in the js source
# TODO: is it better to use d3.json than jquery getJSON?

def id_generator(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


class JSView(object):
    def __init__(self, codestring, cssfile=None, height=300):
        self.__uuid = id_generator(12)
        self.__codestring = codestring
        self.__cssfile = cssfile
        self.__height = height

    @property
    def uuid(self):
        return self.__uuid

    @property
    def height(self):
        return self.__height

    @property
    def cssfile(self):
        return self.__cssfile

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
        display_javascript(Javascript(data=(self.codestring % (self.uuid)), css=self.cssfile))


class JSFileView(JSView):
    def __init__(self, filename, cssfile=None, height=300):
        with open (filename, "r") as jsfile:
            filecontents = jsfile.read()
        filecontents = filecontents.replace("HTMLELEMENT","%s")
        super(JSFileView, self).__init__(filecontents, cssfile, height)


class JSDataView(JSView):
    def __init__(self, jsonfilename, filename, cssfile=None, height=300):
        with open (filename, "r") as jsfile:
            filecontents = jsfile.read()
        filecontents = filecontents.replace("HTMLELEMENT","%s")
        filecontents = filecontents.replace("JSONDATAFILE",jsonfilename)
        super(JSDataView, self).__init__(filecontents, cssfile, height)