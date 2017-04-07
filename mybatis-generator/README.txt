cmd命令

java -jar mybatis-generator-core-1.3.2.jar -configfile generatorConfig.xml -overwrite


可做成.bat文件备用，放在目录运行即可

cmd命令

set current_path="%cd%"
java -jar mybatis-generator-core-1.3.2.jar -configfile generatorConfig.xml -overwrite
pause
exit