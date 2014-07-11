all: npm bower android

npm:
	npm install

bower:
	bower install

android:
	cordova build --release android
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release_badges.keystore platforms/android/ant-build/HelloCordova-release-unsigned.apk alias_name
	rm HelloCordova.apk
	zipalign -v 4 platforms/android/ant-build/HelloCordova-release-unsigned.apk HelloCordova.apk
