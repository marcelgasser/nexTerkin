Import('env')
from shutil import copyfile
import subprocess
import inspect, os.path
from os.path import join, realpath

from preBuildHTML import preBuildHTMLFun
from preBuildConfig import preBuildConfigFun


filename = inspect.getframeinfo(inspect.currentframe()).filename
dir_path = os.path.dirname(os.path.abspath(filename))

# default setting = rebuild config and do not rebuild HTML or certificates
html = False
config = True

# private library flags
domains = ''
for item in env.get("CPPDEFINES", []):
    if item == "REBUILD_HTML":
        html = True
    elif item == "REBUILD_CONFIG":
        config = True
    elif isinstance(item, tuple) and item[0] == "CONFIG_PATH":
        copyfile(env.get("PROJECT_DIR") + '/' + item[1], '../html/js/configuration.json')

if html:
    preBuildHTMLFun()
if config:
    preBuildConfigFun()
