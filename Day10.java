package advent1;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Scanner;

public class Day10 {
        
    private static HashSet<Integer> adapters;
    private static HashMap<Integer, Long> knownPaths;
    private static int oneJoltDiff = 0;
    private static int threeJoltDiff = 0;
    
    public static void main(String[] args) {
        adapters = new HashSet<>();
        knownPaths = new HashMap<>();
        
        try {
            File myObj = new File("C:\\GIT\\Advent1\\src\\advent1\\input.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                adapters.add(Integer.parseInt(data));
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        } 
        
        int current = 0;
        for(int i=0; i < adapters.size(); i++) {
            if (adapters.contains(current+1)) {
                current += 1;
                oneJoltDiff++;
            } else if (adapters.contains(current+2)) {
                current += 2;
            } else if (adapters.contains(current+3)) {
                current += 3;
                threeJoltDiff++;
            } else {
                System.out.println("error!");
            }
        }   
        threeJoltDiff++;
        
        int part1 = oneJoltDiff * threeJoltDiff;     
        System.out.println("Part 1 :" + part1);
        
        long part2 = getPaths(0);
        System.out.println("Part 2 :" + part2);      
    }
    
    private static long getPaths(int c) {
        if (knownPaths.containsKey(c)) {
            return knownPaths.get(c);
        }
        
        long paths = 0;
        ArrayList<Integer> children = getNextAdapters(c);
        if (Collections.max(adapters) == c) {
            paths++;
        } else {
            for (int i=0; i < children.size(); i++) {            
                paths += getPaths(children.get(i));
            }
        }
        
        knownPaths.put(c, paths);
        return paths;
    }
    
    private static ArrayList<Integer> getNextAdapters(int c) {
        ArrayList<Integer> children = new ArrayList<>();
        
        if (adapters.contains(c+1)) {
            children.add(c+1);
        } 
        if (adapters.contains(c+2)) {
            children.add(c+2);
        } 
        if (adapters.contains(c+3)) {
            children.add(c+3);
        } 
        
        return children;
    }
}
